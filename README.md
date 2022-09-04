## Introduction 

This is the assessment Nest.js application that is packaged as a docker image.

This repository is created in a way that Nest.js development will be done inside a docker container and isolated from the real hardware. This ensures development consistency.

This is for development only. Although the image can be built for production, the instructions and corresponding bash files will be put here at a later time (as I am in a time constraint).

## Development

The `do_dev.sh` file will spin up 2 containers (using docker compose). One is the mongodb image, and the other is the Nest.js development image.

Then, it will exec bash inside of the Nest.js container , so you will get an interactive shell directly into the `source` directory.

To start the app and see it for your self:

```bash
# run this to get a bash inside the dev container:
./do_dev.sh ;

# Install packages if you dont have them:
yarn ;

# To run tests:
yarn test ;

# To run the development server and watch for file changes:
yarn start:dev ;
```

By default it will listen on port 3000 and expose it on the host as well.  
Open http://127.0.0.1:3000/api to see the swagger user interface.

## How to scale this?

We can scale the database by using the **clustering** mechanism of the mongodb itself (slave / master scenario).

The crud endpoints are also stateless, which means we can scale up the api by just creating replicas of the `backend` service and load balance them.

Currently this project is in the simplest form possible. If in the future some endpoint depended upon a compute intensive task, we can extract that task as an individual microservice and scale that service only.

And lastly to make it truely scalable we should turn this project into a kubernetes compatible one, which means adding an appropriate `kubefile.yml` and provide instructions and bash files for kubernetes deployment.

## Considerations

- Definitely there will be a need for more CRUD and REST endpoints, but it all depends on the user interface and the contracts between user interface and the backend. Also for the sake of time constraint and simplicity, I have ignored and not thought about more than that.

## Assessment PDF Questions:

**Which parts of the application would you have implemented differently and why should you
have more time?**

I would have completed the github actions CI/CD pipeline yaml file, I would have wrote more tests (very important), and definitely I would have created the authentication of the CRUD api.

## Todo

This project is still in development. I will update the todo list here as I continue the development.

- [ ] In the delete apis, if there is a dependency between the data, it will give an error.
- [ ] Postman file for apis
- [ ] The DB script that generates the structure and the data to run this application
- [ ] Write more nuanced tests.
- [ ] Add a diagram to the `How to scale this?` part above.
- [ ] Authentication. Currently everybody can use the REST api. Its a critical security issue. We should authorize users based on their roles and tokens.
- [ ] Make mongodb instance persistent. Although its enough for testing, We should consider making this project be usable for production too.
- [X] The CI/CD pipeline is incomplete. Complete it.


## License

GPL, Use at your own risk.

&copy; 2022 | Amir Hossein Baghernezhad