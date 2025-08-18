interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  stagger?: number;
}

class AnimationManager {
  private observer: IntersectionObserver | null = null;
  private initialized = false;

  init(options: AnimationOptions = {}) {
    if (this.initialized || typeof window === 'undefined') return;

    const {
      threshold = 0.1,
      rootMargin = '0px 0px -50px 0px',
      stagger = 100,
    } = options;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * stagger);

            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    this.observeElements();
    this.setupOtherAnimations();
    this.initialized = true;
  }

  private observeElements() {
    if (!this.observer) return;

    document
      .querySelectorAll(
        '.section, .work-item, .skill-category, .education-item'
      )
      .forEach((el) => {
        el.classList.add('animate-prepare');
        this.observer?.observe(el);
      });

    document.querySelectorAll('.skill-tag').forEach((el, index) => {
      el.classList.add('animate-prepare-fade');
      (el as HTMLElement).style.animationDelay = `${index * 0.05}s`;
    });
  }

  private setupOtherAnimations() {
    this.initSmoothScrolling();

    this.initHoverAnimations();

    this.initTypingAnimation();
  }

  private initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (anchor as HTMLElement).getAttribute('href')?.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  private initHoverAnimations() {
    document
      .querySelectorAll('.work-item, .skill-category, .education-item')
      .forEach((el) => {
        el.classList.add('hover-lift');
      });
  }

  private initTypingAnimation() {
    const nameElement = document.querySelector('.name');
    if (!nameElement) return;

    const text = nameElement.textContent || '';
    nameElement.textContent = '';
    nameElement.classList.add('typing');

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        nameElement.classList.remove('typing');
      }
    };

    setTimeout(typeWriter, 500);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.initialized = false;
  }
}

export const animationManager = new AnimationManager();
