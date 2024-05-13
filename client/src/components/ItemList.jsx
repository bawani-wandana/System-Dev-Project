import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  
  
  export function ProductListCard({
    img,
    name,
    price,
  }) {
    return (
      <Card shadow={false} className="border border-b1 font-[Lato] ">
        <CardBody className="pb-0">
          <img src={img} alt={img} className="min-w-[300px] w-full" />
          <div className="flex justify-between">
            <div>
              <Typography className="mb-2" color="blue-gray" variant="h5">
                {name}
              </Typography>
              <div className="mb-5 flex items-center gap-2">
                <div className="h-5 w-5 rounded border border-gray-900 bg-brown-300 "></div>
                <div className="h-5 w-5 rounded border border-blue-gray-100 "></div>
                <div className="h-5 w-5 rounded border border-blue-gray-100 bg-gray-900 "></div>
              </div>
            </div>
            <Typography
              variant="h5"
              className="text-gray-600"
            >
              {price}
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }
  
  const CONTENTS = [
    {
      img: "https://www.material-tailwind.com/image/product-4.png",
      name: "Linen Suit",
      price: "$2,500"
    },
    {
      img: "https://www.material-tailwind.com/image/product-3.png",
      name: "Tweed Suit",
      price: "$2,300"
    },
    {
      img: "https://www.material-tailwind.com/image/product-5.png",
      name: "Premium Suit",
      price: "$1,240"
    },
  ];
  
  export function ItemList() {
    return (
      <section className="py-10 px-8 font-[Lato]">
        <div className="mx-auto text-center mb-16">
          <Typography className="font-medium text-lg">
            Tailored Product Search
          </Typography>
          <Typography variant="h1" className="my-4 text-4xl">
            Find What You Need
          </Typography>
          <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
            Simplify your shopping experience with our intuitive filter system.
            Whether you&apos;re looking for specific features, price ranges, or
            brands.
          </Typography>
        </div>
        <div className="mx-auto container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
            {CONTENTS.map(({ img, name, price }, index) => (
              <ProductListCard
                key={index}
                img={img}
                name={name}
                price={price}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default ItemList;