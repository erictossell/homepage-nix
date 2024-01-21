use actix_files as fs;
use actix_web::{web, App, HttpServer};
use clap::{App as ClapApp, Arg};

fn config(static_dir: String) -> impl Fn(&mut web::ServiceConfig) {
    move |cfg: &mut web::ServiceConfig| {
        cfg.service(fs::Files::new("/", &static_dir).index_file("index.html"));
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let matches = ClapApp::new("MyApp")
        .arg(
            Arg::new("static_dir")
                .short('s')
                .long("static-dir")
                .value_name("DIR")
                .help("Sets a custom static directory")
                .takes_value(true),
        )
        .arg(
            Arg::new("port")
                .short('p')
                .long("port")
                .value_name("PORT")
                .help("Sets a custom port")
                .takes_value(true),
        )
        .get_matches();

    let static_dir = matches
        .value_of("static_dir")
        .unwrap_or("./static")
        .to_string();
    let port = matches.value_of("port").unwrap_or("8080");

    HttpServer::new(move || App::new().configure(config(static_dir.clone())))
        .bind(format!("0.0.0.0:{}", port))?
        .run()
        .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::body::to_bytes;
    use actix_web::{http, test, App, Error};

    #[actix_rt::test]
    async fn test_index_ok() -> Result<(), Error> {
        // Provide a static directory path for testing
        let static_dir = "./static".to_string();

        let mut app = test::init_service(App::new().configure(config(static_dir))).await;

        let req = test::TestRequest::get().uri("/").to_request();
        let resp = test::call_service(&mut app, req).await;

        assert_eq!(resp.status(), http::StatusCode::OK);

        let body = to_bytes(resp.into_body()).await?;
        assert!(!body.is_empty(), "Response body should not be empty");

        Ok(())
    }
}
