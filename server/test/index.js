const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js');
const faker = require('faker')

chai.use(chaiHttp);
var token
var name = faker.name.findName()
var email = faker.internet.email()

describe('User Signin and Register', () => {
  describe('Register',() => {
    it('Should Register new User', function(done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: email, name: name, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Register New User');
           expect(res.body).to.have.property('token');
           token = res.body.token
           done();
        })
    })
    it('Should Give error when register same email', function(done) {
      chai.request(app)
        .post('/users/register')
        .send({ email: email, name: name, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(400);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Email has been used');
           done();
        })
    })
  })
  describe('Signin', function() {
    it('Should sign in User', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ email: email, password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Sign In');
           expect(res.body).to.have.property('token');
           done();
        })
    })
    it('Should Give error when wrong credentials', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ email: email, password: 'rahasiasalah' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('User Not Found');
           done();
        })
    })
  })
})
var postId
describe('Post Management', function() {
  it('Should create new Post', function(done) {
    chai.request(app)
      .post('/posts')
      .set('token', token)
      .send({ photo: faker.image.imageUrl(), caption: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Add new Post');
         expect(res.body).to.have.property('data');
         postId = res.body.data._id
         done();
      })
  })
  it('Should Give error when create new Post without auth', function(done) {
    chai.request(app)
      .post('/posts')
      .send({ photo: faker.image.imageUrl(), caption: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Post', function(done) {
    chai.request(app)
      .put(`/posts/${postId}`)
      .set('token', token)
      .send({ photo: faker.image.imageUrl(), caption: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update a Post');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when update a Post without auth', function(done) {
    chai.request(app)
      .put(`/posts/${postId}`)
      .send({ photo: faker.image.imageUrl(), caption: faker.lorem.paragraph() })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Like Post', function(done) {
    chai.request(app)
      .put(`/posts/${postId}/like`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Like a Post');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Unlike Post', function(done) {
    chai.request(app)
      .put(`/posts/${postId}/like`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Unlike a Post');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Post', function(done) {
    chai.request(app)
      .del(`/posts/${postId}`)
      .set('token', token)
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete a Post');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Post without auth', function(done) {
    chai.request(app)
      .del(`/posts/${postId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})
