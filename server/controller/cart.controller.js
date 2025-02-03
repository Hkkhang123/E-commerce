import Product from "../model/product.model.js"

export const getCart = async (req, res) => { 
    try {
        const products = await Product.find({_id: {$in: req.user.cartItem}})

        const cartItem = products.map((product) => {
            const item = req.user.cartItem.find(cartItem => cartItem.id === product.id)
            return {...product.toJSON(), quantity: item.quantity}
        })

        res.json(cartItem)
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở getCart controller: ", error: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body
        const user = req.user

        const existingItem = user.cartItem.find((item) => item.id === productId)
        if (existingItem) {
            existingItem.quantity += 1 
        } else {
            user.cartItem.push(productId)
        }

        await user.save()
        res.json(user.cartItem)
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở addToCart controller: ", error: error.message })
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body
        const user = req.user
        if (!productId) {
            user.cartItem = []
        } else {
            user.cartItem = user.cartItem.filter((item) => item.id !== productId)
        }

        await user.save()
        res.json(user.cartItem)
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở removeAllFromCart controller: ", error: error.message })
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const {id: productId} = req.params
        const {quantity} = req.body
        const user = req.user
        const existingItem = user.cartItem.find((item) => item.id === productId)

        if (existingItem) {
            if(quantity === 0) {
                user.cartItem = user.cartItem.filter((item) => item.id !== productId)
                await user.save()
                return res.json(user.cartItem)
            }

            existingItem.quantity = quantity
            await user.save()
            return res.json(user.cartItem)
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở updateQuantity controller: ", error: error.message })
    }
}