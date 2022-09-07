import mongoose from 'mongoose'

import { CartsSchema } from '../src/carts/carts.schema'
import { ProductsSchema } from '../src/products/products.schema'
import { UsersSchema } from '../src/users/users.schema'

const log = console.log

const start = async () => {
    log("connecting...")
    await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@database:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`)

    log("\ncreating models")
    const Carts = mongoose.model('Carts', CartsSchema)
    const Products = mongoose.model('Products', ProductsSchema)
    const Users = mongoose.model('Users', UsersSchema)

    log("\ninserting data")
    log("creating some users and some products")
    await Users.insertMany([
        {
            name: "john",
            email: "john@gmail.com"
        },
        {
            name: "george",
            email: "george@gmail.com"
        },
        {
            name: "michael",
            email: "michael@gmail.com"
        }
    ])
    await Products.insertMany([
        {
            name: "laptop",
            price: "200"
        },
        {
            name: "blanket",
            price: "50"
        },
        {
            name: "mouse",
            price: "98"
        },
        {
            name: "keyboard",
            price: "23"
        },
        {
            name: "sofa",
            price: "876"
        }
    ])
    log("adding products randomly to some user's carts")
    let queried_users = await Users.find({})
    let queried_products = await Products.find({})
    for (let eachUser of queried_users) {
        let productIds = []
        for (let eachProduct of queried_products) {
            productIds.push(eachProduct.id)
            // add some randomness
            if (Math.random() > 0.5) { break }
        }
        await Carts.insertMany([
            {
                email: eachUser.email,
                items: productIds
            }
        ])
    }

    log("\nlets see the results")
    log("users:")
    log(queried_users)
    log("products:")
    log(queried_products)
    log("carts:")
    log(await Carts.find({}))

    log("\nfinished.")
    process.exit(0)
}

start()