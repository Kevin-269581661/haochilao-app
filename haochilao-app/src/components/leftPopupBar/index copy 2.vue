<template>
	<div class="left-popup-bar-container">
		<div class="tabbar-box">
			<div class="modal" v-show="isTabbarShow" @click="closeTabbar"></div>
			<div :class="[
        'modal-content',
        { show: isTabbarShow }
      ]">
				<div class="scroll-wraper">
					<div class="dish-classify-title">菜品分类</div>

					<ul class="fast-order">
						<li>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-youhuiquan2" />
							</svg>
							优惠
						</li>
						<li>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-redu1" />
							</svg>
							本店销量
						</li>
						<li>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-jilu1" />
							</svg>
							我点过的菜
						</li>
					</ul>

					<div class="dish_classify_wrapper">
						<cube-scroll>
							<ul class="dish-classify-content" ref="classifyWrapper">
								<li
									v-for="(item, i) in dishClassifyList"
									:key="i"
									:class="{ active: currentDishClassifyIndex == i }"
									@click="chooseDishClassify(item, i)"
								>
									<span>{{ item }}</span>
									<!-- <i class="separate-line"></i> -->
								</li>

								<li
									class="slide_block"
									:style="{ 
                  top: slideTop + 'px',
                  width: slideWidth + 'px',
                  height: slideHeight + 'px'
                }"
								></li>
							</ul>
						</cube-scroll>
					</div>
				</div>

				<!-- 打开分类按钮 -->
				<div class="open-tabbar-btn" @click="openTabbar">
					<div class="open-btn-content">
						<div>
							<svg class="classify-icon" aria-hidden="true">
								<use xlink:href="#icon-shiwu" />
							</svg>
						</div>分类
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
let timer;
import BScroll from "better-scroll";

export default {
	name: "tabbar",
	data() {
		return {
			isTabbarShow: null,
			// currentDishClassifyId: null, // 当前选择的菜品分类id
			currentDishClassifyIndex: 0, // 当前选择的菜品分类下标
			slideTop: 0,
			slideWidth: 0,
			slideHeight: 0
		};
	},
	props: ["dishClassifyList", "currentActiveIndex"],
	mounted() {},
	computed: {
		rootRemToPx() {
			let fontSize = document.documentElement.style.fontSize;
			return parseFloat(fontSize);
		}
	},
	watch: {
		currentDishClassifyIndex(newVal) {
			// console.log('currentDishClassifyIndex', newVal)
			this.setSlideWidth();
		},
		dishClassifyList: {
			deep: true,
			handler(val) {
				this.setSlideWidth();
			}
    },
    currentActiveIndex(newVal) {
      this.currentDishClassifyIndex = newVal;
    }
	},
	methods: {
		setSlideWidth() {
			this.$nextTick(() => {
				const currentUl = this.$refs.classifyWrapper;
				const currentLis = currentUl.children;
				// console.log('当前点击的对象的currentLis', currentLis)

				let index = this.currentDishClassifyIndex;
				console.log('当前点击的对象的index', index)

				let currentLi = currentLis[index];
				let currentSpan = currentLi.children[0];

				// console.log('当前点击的对象宽度', currentSpan.offsetWidth)
				// console.log('当前点击的对象高度', currentSpan.offsetHeight)

				this.slideWidth = currentSpan.offsetWidth + this.rootRemToPx * 0.4;
				this.slideHeight = currentSpan.offsetHeight - this.rootRemToPx * 0.2;
				// console.log('滑块宽度', this.slideWidth)

				let top = 0;
				// 不能使用forEach，会报错，因为这是一个类数组
				for (let key in currentLis) {
					if (parseInt(key) < index) {
					
						top += currentLis[key].offsetHeight;
						console.log('key', key)
						console.log('top', top)
					}
				}
				// currentLis.forEach((li, i) => {
				//   if (i < index) {
				//     top += li.offsetHeight
				//   }
				// })
				console.log('top ',top)

				this.slideTop = top + this.rootRemToPx * 0.1;
				// console.log('滑块的top', this.slideTop)
			});
		},
		// 打开菜单栏
		openTabbar() {
			if (this.isTabbarShow) {
				this.isTabbarShow = false;
			} else {
				this.isTabbarShow = true;
			}
		},
		closeTabbar() {
			this.isTabbarShow = false;
		},
		// 选择菜品
		chooseDishClassify(item, index) {
      // this.currentDishClassifyId = item.id;  没有使用id
      if (index === this.currentDishClassifyIndex) return false;
      this.currentDishClassifyIndex = index;
      // this.$store.commit('setLeftActiveLabel', item)
      this.$emit('labelChange', index);
      this.checkAction();
		},
		checkAction() {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				this.closeTabbar();
			}, 750)
		}
	}
};
</script>
<style lang="stylus" scoped>
.left-popup-bar-container {
	position: relative;

	.tabbar-box {
		.modal {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.6);
			z-index: 200;
		}

		.modal-content {
			position: fixed;
			left: -3.1rem;
			top: 0;
			bottom: 0;
			min-width: 0.7rem;
			transition: all 0.2s ease-out;
			opacity: 0.5;
			z-index: 201;
		}

		.modal-content.show {
			left: 0;
			opacity: 1;
		}

		.transparent {
			opacity: 0.3;
		}

		// 分类按钮
		.open-tabbar-btn {
			position: absolute;
			top: 50%;
			right: -24%;
			transform: translateY(-50%);
			background-color: #fff;
			width: 1.2rem;
			height: 1.2rem;
			border-radius: 50%;
			font-size: 0.24rem;
			z-index: 202;

			.open-btn-content {
				width: 0.69rem;
				height: 1rem;
				position: absolute;
				top: 0.1rem;
				right: 0;
				// background-color rgba(125, 125, 125, 0.3)
			}
		}

		// 分类框
		.scroll-wraper {
			// background-color #eeeeee
			background-color: #fff;
			position: relative;
			z-index: 203;
			height: 100%;
			width: 3.1rem;
			// overflow-y scroll
			overflow: hidden;
		}
	}

	.dish-classify-title {
		font-size: 0.29rem;
		font-weight: 600;
		color: #fc9153;
		// background-color: #eee;
		background-image: linear-gradient(to top, #f2f2f2, #fff);
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #ccc;
		text-align: center;
		// padding-left 1rem
	}

	.fast-order {
		border-bottom: 1px solid #ccc;
		font-size: 0.3rem;
		color: #1989fa;
		padding-left: 0.3rem;

		li {
			height: 0.95rem;
			line-height: 0.95rem;
			border-bottom: 1px solid #ccc;
		}

		li:last-child {
			border: 0;
		}
	}

	.dish_classify_wrapper {
		height: calc(100% - 3.65rem);
	}

	.dish-classify-content {
		font-size: 0.28rem;
		position: relative;
		border: 0.2rem solid #eee;
		border-right: none;

		li {
			// padding-left 1rem
			// margin-bottom 1px
			position: relative;
			z-index: 204;
			padding: 0 0.45rem;
			text-align: center;
			background-color: transparent;

			span {
				display: inline-block;
				// width 100%
				padding: 0.35rem 0;
			}
		}

		// li:last-child{
		// border 0
		// }
		li.active {
			color: #fff;
		}

		li.slide_block {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			height: 80%;
			background-color: #fc9153;
			border-radius: 0.2rem;
			z-index: -1;
			transition: all 0.2s ease;
		}
	}

	.classify-icon {
		width: 0.5rem;
		height: 0.5rem;
		vertical-align: -0.15rem;
		fill: currentColor;
		overflow: hidden;
		margin-right: 0;
		margin-bottom: 0.07rem;
	}

	.disable-move {
		position: fixed;
		// top 0
		height: 100%;
		overflow: hidden;
	}
}
</style>