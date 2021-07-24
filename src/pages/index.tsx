import {WeatherCard} from "../components/core/weather/WeatherCard";
import {Layout} from "../components/Layout";

function Index(){
  return (
    <Layout>
      <div className="d-flex justify-content-between flex-lg-wrap-reverse flex-xl-nowrap flex-sm-wrap-reverse flex-wrap-reverse">
        <WeatherCard className="order-2" color="red" />
        <WeatherCard className="order-3" color="red" />
        <WeatherCard className="order-4" color="red" />
        <WeatherCard className="order-5" color="red" />
      </div>
    </Layout>
  )
}

export default Index;
