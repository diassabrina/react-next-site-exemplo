import React from "react";
import Container from "../container";
import Button from "../button";
import style from "./style.scss";
import Link from "next/link";

import dot4 from "../../static/images/color/dot-red.png";
import dot5 from "../../static/images/color/dot-blue.png";
import dot6 from "../../static/images/color/dot-grey.png";

const summary = ({ steps, total, page }) => {
	const dots = [dot4, dot5, dot6];
	const pages = ["engine", "color", "wheels", "results"];

	const items = steps => {
		let stopShow = false;
		let stored = Object.keys(steps);

		let item = {
			car: (
				<li className={style.hiddenSmall} key={1}>
					{(steps.car || {}).name}
				</li>
			),
			engine: (
				<li className={style.hiddenSmall} key={2}>
					<Link as={"/build/engine"} href={"/build/engine"}>
						<a>
							{(steps.engine || {}).kwh}
							<span>{(steps.engine || {}).type}</span>
						</a>
					</Link>
				</li>
			),
			color: (
				<li className={style.hiddenSmall} key={3}>
					<Link as={"/build/color"} href={"/build/color"}>
						<a>
							<img
								src={dots[(steps.color || {}).id - 4]}
								className={style.dot}
							/>
						</a>
					</Link>
				</li>
			),
			wheels: (
				<li className={style.hiddenSmall} key={4}>
					<Link as={"/build/wheels"} href={"/build/wheels"}>
						<a>
							<img src={(steps.wheels || {}).image} className={style.wheels} />
						</a>
					</Link>
				</li>
			)
		};

		return Object.keys(item)
			.filter(item => stored.indexOf(item) >= 0)
			.map(el => {
				if (stopShow) return true;
				if (page === el) stopShow = true;
				return item[el];
			});
	};

	return (
		<footer className={style.summary}>
			<Container>
				<ul className={style.summaryList}>
					<li>
						Total
						<span>${total}</span>
					</li>
					{items(steps)}
					<li>
						<Button
							classAdd="lessSpace"
							mask={"/build/" + pages[pages.indexOf(page) + 1]}
							link={"/build?step=" + pages[pages.indexOf(page) + 1]}
							status="btnNext"
							text="next"
						/>
					</li>
				</ul>
			</Container>
		</footer>
	);
};

export default summary;
