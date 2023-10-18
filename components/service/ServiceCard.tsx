import { useAddToCartMutation } from "@/app/redux/api/cart/cartApi";
import { getUserInfo } from "@/app/utils/auth";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";

const ServiceCard = ({ service }: { service: any }) => {
  const { userId, role } = getUserInfo() as any;
  const [addToCart] = useAddToCartMutation();

  const handleCart = async (data: any) => {
    try {
      const createData = {
        service: data.id,
        userId,
      };
      const result = await addToCart(createData);

      if (result) message.success("added to cart");
    } catch (err: any) {
      if (err) message.error("something went wrong");
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 w-72 border border-orange-400 px-3 py-3 rounded-md">
        <div className="overflow-hidden h-[170px]">
          <Image
            src={service.image}
            alt="wheel-repair-image"
            height={200}
            width={280}
            className="hover:scale-125 transition duration-300"
          />
        </div>
        <div className="text-xl font-semibold text-gray-600">
          {service.title}
        </div>
        <div className="text-lg font-semibold text-gray-600">
          $ {service.price}
        </div>
        <div className="text-sm">
          <p className="text-orange-400">Description </p>
          {service.description && service.description.length > 200
            ? service.description.substring(0, 100) + "..."
            : service.description}
        </div>
        <div className="flex justify-between item-center">
          <div>
            <Link href={`/${role}/services`}>
              <button className="px-5 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition flex gap-2 items-center">
                services <TbExternalLink />
              </button>
            </Link>
          </div>
          <div>
            <button
              className="px-5 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition flex gap-2 items-center"
              onClick={() => handleCart(service)}
            >
             cart <AiOutlineShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
