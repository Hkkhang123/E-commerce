import User from "../model/user.model.js"
import Product from "../model/product.model.js"
import Order from "../model/order.model.js"

export const AnalyticsData = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData()

        const endDate = new Date()
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)

        const dailySaleData = await getDailySaleData(startDate, endDate)

        res.json({ analyticsData, dailySaleData })
        
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở AnalyticsData controller: ", error: error.message })
    }
}

export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments()
    const totalProducts = await Product.countDocuments()

    const saleData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: {$sum:1},
                totalRevenue: {$sum: "$totalAmount"},
            }
        }
    ])

    const { totalSales, totalRevenue } = saleData[0] || {totalSales: 0, totalRevenue: 0}

    return { user: totalUsers, products: totalProducts, totalSales, totalRevenue }
}

export const getDailySaleData = async (startDate, endDate) => {
    const dailySaleData = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
                sales: { $sum: 1 },
                revenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ])

    const dateArray = getDateInRange(startDate, endDate)

    return dateArray.map(date => {
        const foundData = dailySaleData.find(data => data._id === date)

        return {
            date, 
            sale: foundData?.Sales || 0,
            revenue: foundData?.Revenue || 0
        }
    })
}

function getDateInRange(startDate, endDate) {
    const dates = []
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split('T')[0])
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}