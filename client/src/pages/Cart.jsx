import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateCartProduct } from '../redux/cartRedux';
import StripeCheckout from 'react-stripe-checkout'
import userRequest from '../config';
import { useNavigate } from 'react-router-dom';
import PayPal from '../component/PayPal'
import PaymentIcon from '@mui/icons-material/Payment';
import {
    Container,
    Wrapper,
    Title,
    Top,
    TopButton,
    TopText,
    Bottom,
    Info,
    Hr,
    Product,
    ProductDetail,
    ImageContainer,
    Image,
    Details,
    ProductName,
    ProductId,
    ProductColor,
    ProductSize,
    PriceDetail,
    ProductAmountContainer,
    ProductAmount,
    ProductPrice,
    Button,
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice
} from './style-component/Cart'
const KEY = process.env.REACT_APP_STRIPE;
const Cart = () => {
    const cart = useSelector(state => state.cart)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navi = useNavigate()
    const addQuantity = (productId, price, quantity, currentQuantity) => {
        if (currentQuantity === 10) return
        dispatch(updateCartProduct({
            productId, amount: price, quantity
        }))
    }
    const minusQuantity = (productId, price, quantity, currentQuantity) => {
        if (currentQuantity === 1) return
        dispatch(updateCartProduct({
            productId, amount: price, quantity
        }))
    }
    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token) => {
        setStripeToken(token)
    }
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const response = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken?.id,
                    amount: cart.total * 100,
                })
                navi('/success', {
                    state: {
                        stripeData: response.data,
                        cart: cart
                    }
                })
            } catch (error) {

            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, navi, cart])
    const handleDelete = (productId, quantity, price) => {
        dispatch(deleteProduct({
            productId, amount: quantity * price
        }))
    }
    const tranSuccess = async (payment) => {
        navi('/success', {
            state: {
                stripeData: payment,
                cart: cart
            }
        })
    }
    return (
        <Container>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton onClick={() => navi('/')}>CONTINUE SHOPPING</TopButton>
                    <TopText>Your Wish List(0)</TopText>
                </Top>
                <Bottom>
                    <Info>
                        {
                            cart?.products?.length === 0 ? '' :
                                cart?.products?.map(item => (
                                    <React.Fragment key={item._id}>
                                        <Hr />
                                        <Product>
                                            <ProductDetail>
                                                <ImageContainer>
                                                    <Image src={item?.images[0]?.url} />
                                                </ImageContainer>
                                                <Details>
                                                    <ProductName>
                                                        <b>Product:</b> {item?.title.toUpperCase()}
                                                    </ProductName>
                                                    <ProductId>
                                                        <b>ID:</b> {item?._id}
                                                    </ProductId>
                                                    <ProductColor color={item?.color[0]} />
                                                    <ProductSize>
                                                        <b>Size:</b> {item?.size[0]}
                                                    </ProductSize>
                                                </Details>
                                            </ProductDetail>
                                            <PriceDetail>
                                                <ProductAmountContainer>
                                                    <RemoveIcon style={{ cursor: 'pointer' }} onClick={() => minusQuantity(item?._id, item?.price * -1, -1, item?.quantity)} />
                                                    <ProductAmount>{item?.quantity}</ProductAmount>
                                                    <AddIcon style={{ cursor: 'pointer' }} onClick={() => addQuantity(item?._id, item?.price, 1, item?.quantity)} />
                                                </ProductAmountContainer>
                                                <ProductPrice>$ {item?.price * item?.quantity}</ProductPrice>
                                                <Button style={{ width: '60%' }} onClick={() => handleDelete(item?._id, item?.quantity, item?.price)}>Delete</Button>
                                            </PriceDetail>
                                        </Product>
                                        <Hr />
                                    </React.Fragment>
                                ))
                        }
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
                        </SummaryItem>
                        {
                            cart?.total && cart?.total > 0 && currentUser &&
                            <div className='checkout-container'>
                                <StripeCheckout
                                    name="Shopping"
                                    image='https://coin68.com/wp-content/uploads/2022/04/stripe-payment.jpg'
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is $${cart?.total}`}
                                    amount={cart?.total * 100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <Button disabled={cart.total <= 0 || !currentUser} style={{ backgroundColor: '#45b1e8', border: 'none', color: 'black', fontSize: '11px', fontWeight: '200', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', padding: '6px' }}><PaymentIcon /> Checkout</Button>
                                </StripeCheckout>
                                <PayPal disabled total={cart.total} tranSuccess={tranSuccess} />
                            </div>
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    )
}

export default Cart