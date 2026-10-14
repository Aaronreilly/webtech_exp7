$(function(){
 let cart=[], activeProduct=null, cakeQty=1, toastTimer;
 const money=n=>"₹"+Math.round(n).toLocaleString("en-IN");
 function toast(msg){$("#toast").text(msg).addClass("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("#toast").removeClass("show"),2200)}
 function renderCart(){let count=cart.reduce((s,x)=>s+x.qty,0),sum=cart.reduce((s,x)=>s+x.price*x.qty,0);$("#cartCount,#drawerCount").text(count);$("#cartSubtotal").text(money(sum));if(!cart.length){$("#cartItems").html('<p class="empty-cart">Your bag is taking a little breather. Find something you love.</p>');return}$("#cartItems").html(cart.map((x,i)=>`<div class="cart-item"><div><strong>${x.name}</strong><p>${money(x.price)} × ${x.qty}</p></div><button data-remove="${i}">Remove</button></div>`).join(""))}
 $("#filters").on("click",".filter-pill",function(){$(".filter-pill").removeClass("active");$(this).addClass("active");filterProducts()});
 function filterProducts(){let cat=$(".filter-pill.active").data("category"),q=$("#searchInput").val()?.toLowerCase()||"",shown=0;$(".product-card").each(function(){let el=$(this),ok=(cat==="all"||el.data("category")===cat)&&String(el.data("name")).toLowerCase().includes(q);el.toggle(ok);if(ok)shown++});$("#noResults").toggle(shown===0)}
 $("#sortProducts").on("change",function(){let cards=$(".product-card").get();let mode=$(this).val();cards.sort((a,b)=>mode==="low"?+$(a).data("price")-+$(b).data("price"):mode==="high"?+$(b).data("price")-+$(a).data("price"):+$(a).data("featured")-+$(b).data("featured"));$("#productGrid").append(cards)});
 $("#searchToggle").on("click",function(){$("#searchPanel").toggleClass("open");if($("#searchPanel").hasClass("open"))$("#searchInput").trigger("focus")});
 $("#searchInput").on("input",filterProducts);$("#clearSearch").on("click",function(){$("#searchInput").val("");filterProducts()});
 $("#menuToggle").on("click",function(){$("#mainNav").toggleClass("open")});$("#mainNav a").on("click",function(){$("#mainNav").removeClass("open")});
 $(".add-button").on("click",function(){let name=$(this).data("name"),price=+$(this).data("price"),item=cart.find(x=>x.name===name);if(item)item.qty++;else cart.push({name,price,qty:1});renderCart();toast(name+" added to your bag ✓")});
 $(".wishlist").on("click",function(){$(this).toggleClass("liked").text($(this).hasClass("liked")?"♥":"♡");toast($(this).hasClass("liked")?"Added to your wishlist":"Removed from wishlist")});
 $(".quick-view").on("click",function(){activeProduct=$(this).data("product");$("#modalTitle").text(activeProduct);$("#modalBackdrop").addClass("open")});
 $("#modalClose,#modalBackdrop").on("click",function(e){if(e.target===this||e.currentTarget.id==="modalClose")$("#modalBackdrop").removeClass("open")});
 $("#modalAdd").on("click",function(){let card=$(".product-card").filter(function(){return $(this).data("name").toLowerCase()===activeProduct.toLowerCase()});if(card.length)card.find(".add-button").trigger("click");$("#modalBackdrop").removeClass("open")});
 $("#cartButton").on("click",function(){$("#cartDrawer").addClass("open");$("#drawerScrim").addClass("open")});$("#cartClose,#drawerScrim").on("click",function(){$("#cartDrawer").removeClass("open");$("#drawerScrim").removeClass("open")});
 $("#cartItems").on("click","[data-remove]",function(){cart.splice(+$(this).data("remove"),1);renderCart()});$("#checkoutButton").on("click",function(){toast("This is a demo store — no payment is collected.")});
 $("#newsletterForm").on("submit",function(e){e.preventDefault();$("#newsletterMessage").text("Thanks for joining TechHaus! This demo does not store email addresses.");$("#emailInput").val("");toast("Thanks for subscribing!")});
 // Budget calculator tool
 $("#budgetCalculate").on("click",function(){let income=Number($("#toolIncome").val()),needs=Number($("#toolNeeds").val()),tech=Number($("#toolTech").val());if(income<=0||!Number.isFinite(income)||needs<0||tech<0||needs>100||tech>100||needs+tech>100){$("#budgetResult").html("Please enter valid values.<small>Percentages must be 0–100 and combined total cannot exceed 100%.</small>");return}let n=income*needs/100,t=income*tech/100,r=income-n-t;$("#budgetResult").html(`Essentials: <strong>${money(n)}</strong><small>Tech fund: ${money(t)} · Remaining: ${money(r)}</small>`);});
 // Cake calculator tool
 function updateCake(){let total=Number($("#cakeChoice").val())*cakeQty;$("#cakeQtyDisplay").text(cakeQty);$("#cakeResult").html(`Order total: <strong>${money(total)}</strong><small>${cakeQty} cake(s) · ${money(Number($("#cakeChoice").val()))} each</small>`)}
 $("#cakeMinus").on("click",function(){cakeQty=Math.max(1,cakeQty-1);updateCake()});$("#cakePlus").on("click",function(){cakeQty=Math.min(99,cakeQty+1);updateCake()});$("#cakeChoice").on("change",updateCake);$("#cakeCalculate").on("click",function(){updateCake();toast("Cake order total calculated")});
 // Car customization tool
 let carColor="Blue";$(".tool-swatch").on("click",function(){$(".tool-swatch").removeClass("active");$(this).addClass("active");carColor=$(this).data("colorname")});
 $("#carApply").on("click",function(){$("#carResult").html(`Your setup: <strong>${carColor}</strong><small>${$("#glassTint").val()} tint · ${$("#wheelSize").val()} wheels. Visual configuration saved for this session.</small>`);toast("Car customization updated")});
 renderCart();updateCake();
});