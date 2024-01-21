import './js/main';
import './css/common.scss';
import "./css/style.scss";


// New branch test
console.log('add listener 17-06');

window.addEventListener('unload', function(params) {
    const prevScroll = Math.round(window.scrollY);

    this.localStorage.setItem('scrollSize', prevScroll);
})


{/* <div>
  <div v-if="ok">yes</div>
  <span v-else>no</span>
</div> */}


