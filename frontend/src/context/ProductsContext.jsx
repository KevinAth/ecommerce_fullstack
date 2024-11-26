import { createContext, useState, useEffect } from "react";
import { GetProducts, GetCategories } from "../api/api_products";

export const ProdContext = createContext();

export function ProdContextProvider(props) {
  const [cart, setCart] = useState([]);
  const [isAutenticated, setIsAutenticated] = useState(false);
  useEffect(() => {
    const storedcart = localStorage.getItem("cart");
    if (storedcart) {
      setCart(JSON.parse(storedcart));
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAutenticated(true);
    }
  });
  // añadimos nuevos productos al carrito
  function addCart(product, quantity) {
    const exists = Object.values(cart).find(
      (item) => item.product.id == product.id
    );
    let newproduct;
    if (exists) {
      const ser = (exists.quantity += quantity);
      newproduct = Object.values(cart).map((item) =>
        item.product.id == product.id
          ? { ...item, product, quantity: ser }
          : item
      );
    } else {
      // hacemos una copia del array cart y le agregamos el nuevo producto
      newproduct = [...cart, { product, quantity }];
    }
    // actualizamos el array cart con los nuevos datos
    setCart(newproduct);
    // almacenosmos los nuevo datos en el localstorage con el nuevo producto
    localStorage.setItem("cart", JSON.stringify(newproduct));
  }

  function removeProductCart(product) {
    const products = cart.filter(
      (item) => item.product.id != product.product.id
    );
    setCart(products);
    localStorage.setItem("cart", JSON.stringify(products));
  }
  function updateCart(product, count) {
    let update = cart.map((item) =>
      item.product.id == product.product.id
        ? // utiliza '...' para copiar todas las propiedades de un objeto --> hace un copia de item <-> creamos un nuevo objeto product con los datos de item.product => {nombre:xxxxxx,precio:xxxxxx...} y luego agrega o sustitulles por las propiedades con las de 'product'. que en realidad no cambia nada.en forma que queda asi => {...item,product:{...item.product,product}} pero como en si no se necesita realizar ningun cambio en esa parte entonces no se pone en vez de eso se pone {...item,product:item.product}
          { ...item, product: item.product, quantity: count }
        : item
    );
    /*let update = [...cart,{ ...product, product: product.product, quantity: count },];*/ // no funciona por que dice que 'cart.map is not a function' no entiendo por que si es basicamente lo mismo , talvez por lo que estoy trallendo los datos como argumentos de una funcion. al parecer envia los datos y combierte cart en un solo objeto en ves de un array de objetos haciendo que la funcion map no se le pueda aplicar, con el cambio de [...cart] crea un objeto independiente nuevo, creo que el problemas es que no sabe a que objeto se refiere que en el algorimo de arriba si al haberlo buscado y\o filtrado , talvez guarda la pocision de algun modo y de esa forma lo sabe y sabe cual modificar
    console.log(update);
    setCart(update);
    localStorage.setItem("cart", JSON.stringify(update));
  }

  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function loadproducts() {
      let res = await GetProducts();
      setProducts(res.data);
    }
    loadproducts();
    async function loadCategories() {
      let res = await GetCategories();
      setCats(res.data);
    }
    loadCategories();
  }, []);


  return (
    <ProdContext.Provider
      value={{
        products,
        setProducts,
        cats,
        addCart,
        cart,
        setCart,
        updateCart,
        isAutenticated,
        setIsAutenticated,
      }}
    >
      {props.children}
    </ProdContext.Provider>
  );
}
