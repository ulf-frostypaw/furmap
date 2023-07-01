const Discord = () => {
	return (
		<div className={"margin"}>
			<h2>Discord Server</h2>
			<div className={"row"}>
				<div className={"col"}>
					<p>
						Furmap has a discord server !
						Join the community and chat with members around the world.
					</p>
					<p>
						Rules :
						Here are a few rules in the server :
					</p>
					<ul>
						<li>This server is Safe For Work, please do not post any NSFW content on it.</li>
						<li>Respect everyone, do not be mean or offensive.</li>
						<li>This server is mainly to discuss about furmap, although you are allowed to talk about anything !</li>
						<li>You can invite your friends on it !</li>
					</ul>
					<button className={"accent"} onClick={() => { window.location.href = "https://discord.gg/2NYhZrjSn6"; }}>
						Join the server
					</button>
				</div>

				<div className={"col"}>
					<iframe title={"Discord server"} src="https://discord.com/widget?id=1124411618034458655&theme=dark" width="350" height="500" allowTransparency frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
				</div>
			</div>
		</div>
	);
};

export default Discord;
