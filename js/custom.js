
// Show & hide the tabs on the review page.
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".woocommerce-tabs .wc-tabs li a");
    const tabPanels = document.querySelectorAll(".woocommerce-tabs .woocommerce-Tabs-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove 'active' class from all tabs
            tabs.forEach(t => t.parentElement.classList.remove("active"));

            // Add 'active' class to clicked tab
            this.parentElement.classList.add("active");

            // Hide all tab panels
            tabPanels.forEach(panel => panel.style.display = "none");

            // Show the selected tab panel
            const selectedPanel = document.querySelector(this.getAttribute("href"));
            if (selectedPanel) {
                selectedPanel.style.display = "block";
            }
        });
    });

    // Trigger default tab display
    tabPanels.forEach(panel => panel.style.display = "none");
    const activeTab = document.querySelector(".wc-tabs li.active a");
    if (activeTab) {
        const defaultPanel = document.querySelector(activeTab.getAttribute("href"));
        if (defaultPanel) defaultPanel.style.display = "block";
    }
});

// Validate the search.
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.ct-search-form');
    const input = form.querySelector('input[name="search"]');
    // On form submit, validate input
    form.addEventListener('submit', function (e) {
        const value = input.value.trim();
        if (value === "") {
            e.preventDefault();
            input.focus();
            input.classList.add("input-error");
        }
    });
    // If user clicks outside the form, remove input-error class
    document.addEventListener('click', function (e) {
        if (!form.contains(e.target)) {
            input.classList.remove("input-error");
        }
    });
    // Remove error class when mouse leaves the form
    form.addEventListener('mouseleave', function () {
        input.classList.remove("input-error");
    });
    // Remove error class as soon as user starts typing
    input.addEventListener('input', function () {
        if (input.classList.contains('input-error') && input.value.trim() !== '') {
            input.classList.remove('input-error');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    const subMenu = item.querySelector('.sub-menu');

    if (subMenu) {
      item.addEventListener('mouseenter', () => {
        subMenu.style.display = 'block';
        item.classList.add('ct-active');
      });

      item.addEventListener('mouseleave', () => {
        subMenu.style.display = 'none';
        item.classList.remove('ct-active');
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector('[data-toggle-panel="#offcanvas"]');
  const offcanvas = document.querySelector('#offcanvas');
  const closeBtn = offcanvas.querySelector('.ct-toggle-close');

  // Show the offcanvas and disable body scroll
  toggleBtn.addEventListener('click', function () {
    offcanvas.classList.add('active');
    document.body.style.overflow = 'hidden';
    offcanvas.removeAttribute('inert');
  });

  // Hide the offcanvas and re-enable body scroll
  closeBtn.addEventListener('click', function () {
    offcanvas.classList.remove('active');
    document.body.style.overflow = '';
    offcanvas.setAttribute('inert', '');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".product-information a[href]");
  links.forEach(link => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    // link.setAttribute("style", "text-decoration: underline; font-weight: normal; text-underline-position: under;");
    // const strong = link.querySelector("strong");
    // if (strong) {
    //   strong.setAttribute(
    //     "style",
    //     "text-decoration: underline; font-weight: normal; text-underline-position: under;"
    //   );
    // }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('input[name="search"]');
  if (searchInput) {
    searchInput.focus();
    searchInput.click();
  }
});