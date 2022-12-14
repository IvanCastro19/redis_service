import request from 'supertest';
import app from '../app';

describe('Valid store message request', () => {
    let server = app;

    it('should return a 200 status code and send message', (done) => {
        request(server).post('/v1/store_message').send({
            "contacts": [ { "profile": {"name": "Ivan"}, "wa_id": "5214491120164" } ],
              "messages": [
                  {
                  "from": "5214491120164",
                  "id": "ABGHUhmZI5FZTwIQyV0lWfZ10in3U8-R7WD3Yw",
                  "referral": {
                          "body": "https://elprestamodelmes.com.mx/",
                          "headline": "Chatea con nosotros",
                          "image": "any",
                          "source_id": "23851100798780688",
                          "source_type": "ad",
                          "source_url": "https://fb.me/testing"
                  },
                  "text": { "body": "Hola" },
                  "timestamp": "16556109713",
                  "type": "text"
                  }
              ]
          }).set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((error, res) => {
            if(error)
                return done(error);
            console.log("done")    
            return done();
          })
    })
})
