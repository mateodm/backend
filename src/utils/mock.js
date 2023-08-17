import {faker} from "@faker-js/faker"

export default function generateProduct() {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: parseInt(faker.string.numeric()),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url()
    }
}

