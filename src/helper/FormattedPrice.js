const FormattedPrice = (price) => {
    const newPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    return newPrice
}

export default FormattedPrice