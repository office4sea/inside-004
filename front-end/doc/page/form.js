app(_=> {
    app.html.insert(app.el.get('header'), '#main');
    const cart=  app.html.dataVo('#cart');
    const billing=  app.html.dataVo('#billing');

    _setCart();
    _setBilling();

    function _setBilling() {
        billing.submit.event('click', e=> {
            alert();
        });
    }
    function _setCart() {
        cart.submit.event('click', e=> {
            const code= cart.promoCode.value;
            if(code) cart.promoInfo.clss.remove('d-none');
            else {
                cart.promoInfo.clss.add('d-none');
                app.alert(cart.promoCode, '프로모션 코드를 입력 하세요.');
            }
        });
    }
});
