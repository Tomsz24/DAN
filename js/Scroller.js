class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = document.querySelectorAll('.section');
    const sectionsArr = [...this.sections];

    // const sectionsArray = this.sections.findIndex(element => this.isScrolledIntoView(element))
    const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);

    // this.currentSectionIndex = currentSectionIndex < 0 ? 0 : currentSectionIndex;

    this.currentSectionIndex = Math.max(currentSectionIndex, 0)
    this.isThrottled = false;
    this.drawNavigation();

    document.body.appendChild(this.navigationContainer);
  }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = Math.floor(rect.top);
    const elemBottom = Math.floor(rect.bottom);

    const isVissible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

    return isVissible
  }

  listenScroll = event => {
    if (this.isThrottled) return;
    this.isThrottled = true;

    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);

    const direction = event.wheelDelta < 0 ? 1 : -1;
    console.log(event.wheelDelta);

    this.handleScroll(direction);

  }


  handleScroll = direction => {
    if (direction === 1) {
      const isLastSection = this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const isFirstSection = this.currentSectionIndex === 0;
      if (isFirstSection) return;
    }

    this.currentSectionIndex = this.currentSectionIndex + direction;
    this.scrollToCurrentSection();
  }

  scrollToCurrentSection = () => {
    this.selectActiveNavItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  drawNavigation = () => {
    this.navigationContainer = document.querySelector('aside');
    const list = document.querySelector('ul');

    this.sections.forEach((section, index) => {
      const listItems = document.querySelectorAll('li');

      listItems.forEach((item, i) => {
        item.addEventListener('click', () => {
          this.currentSectionIndex = i;

          this.scrollToCurrentSection();
        })
      })

      // listItem.addEventListener('click', () => {
      //   this.currentSectionIndex = index;

      //   this.scrollToCurrentSection();
      // })

      // list.appendChild(listItems);
    })

    this.navigationContainer.appendChild(list);

    this.selectActiveNavItem();
  }

  selectActiveNavItem = () => {
    if (this.navigationContainer) {
      const navigationItems = this.navigationContainer.querySelectorAll('li');

      navigationItems.forEach((item, index) => {
        if (index === this.currentSectionIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      })
    }

  }
}