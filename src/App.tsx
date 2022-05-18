import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./Item/item";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartitems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItem = (items: CartItemType[]) => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCard = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong....</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart Gose Here
      </Drawer>
      <StyledButton
        onClick={() => setCartOpen(true)}
        color="primary"
        aria-label="add to shopping cart"
      >
        <Badge badgeContent={getTotalItem(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
