const React = require('react')
const Slider = require('src/index');
const Item = Slider.Item;

const countries = [require('images/superior/c1.png'),require('images/superior/c2.png'),require('images/superior/c3.png'),require('images/superior/c4.png')]
const descs = [{title : '日本－Japan',description : '在日本有1个自营仓库，是日本成田仓库。'},{title : '德国－Germany',description : '在德国有1个自营仓库，是在欧洲中心-德国特罗斯多夫仓库。'},
	{title : '澳大利亚－Australia',description : '在澳大利亚有1个自营仓库，是澳大利亚新南威尔士仓。'},{title : '美国－America',description : '在美国共有三个自营仓库，分别是美国西部加利福尼亚（CA）仓库、俄勒冈（OR）免税州、东部特拉华（DE）免税州仓库。'}]
const imgArr = [
	{url: "http://member.360hitao.com/images/home/banners/banner1.png"},
	{url: "http://member.360hitao.com/images/home/banners/banner2.png"},
	{url: "http://member.360hitao.com/images/home/banners/banner3.png"}];
class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let html = countries.map((img, i) => {
			return (
				<div key={i} className="flag">
					<img src={img} />
					<b>{descs[i].title}</b>
					<p>{descs[i].description}</p>
				</div>
			)
		});

		return (
			<div className='app'>
				<Slider controlNav width="100%" height="500" pauseOnAction interval={3}>
					{imgArr.map((img, i) => <Item key={i} link={img.link} src={img.url}/>)}
				</Slider>
			</div>
		)
	}
}

module.exports = App