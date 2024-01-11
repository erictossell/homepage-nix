use actix_files as fs;
use actix_web::{web, App, HttpServer};

fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(fs::Files::new("/", "./static").index_file("index.html"));
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().configure(config))
        .bind("0.0.0.0:8080")?
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
        let mut app = test::init_service(App::new().configure(config)).await;

        let req = test::TestRequest::get().uri("/").to_request();
        let resp = test::call_service(&mut app, req).await;

        assert_eq!(resp.status(), http::StatusCode::OK);

        let body = to_bytes(resp.into_body()).await?;
        assert!(!body.is_empty(), "Response body should not be empty");

        Ok(())
    }
}
