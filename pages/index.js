import CardProduct from "../src/components/cards/CardProduct";
import CarouselHomePages from "../src/components/Carousel/CarouselHomePages";
import MainLayout from "../src/components/layouts/MainLayout";
import productApi from "../src/services/ProductApi";

export default function Home({ arrProduct }) {
    return (
        <MainLayout>
            <CarouselHomePages />
            {/* render các cardProduct */}
            <div className="container mx-auto mt-[30px]">
                <h2 className="uppercase text-center font-bold p-4 text-2xl">
                    Sản phẩm mới
                </h2>
                <div className=" mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {arrProduct.map((item, index) => {
                        return <CardProduct key={index} item={item} />;
                    })}
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = async () => {
    const arrProduct = await productApi.allProduct();
    // call api lấy về mảng item prroduct
    return { props: { arrProduct } };
};
