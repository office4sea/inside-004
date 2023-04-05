app(_=> {
    // 헤더 & 네비바
    app.el.set('header', el=> {
        return el.header(header=> {
            const vo= app.html.dataVo(header);
            _initDisplay();
            _bindEvent();

            function _bindEvent() {
                // search
                vo.search.event('click', e=> {
                    const keyword= vo.keyword.value.trim();
                    app.alert(e, keyword ? keyword : '검색어를 입력 하세요.')
                        .then(_=> {
                            keyword ? vo.search.focus : vo.keyword.focus();
                        });
                });
                // login
                vo.login.event('click', e=> {
                    app.modal({
                        view: app.html.get('LoginModal'),
                        focus: e,
                        payload: {a:1}
                    });
                });
            }
            function _initDisplay() {
                app.debug.log('접속 경로:', location.pathname);
                [
                    {nav: vo.navHome, href: '/'},
                    {nav: vo.navForm, href: '/page/form.html'},
                    {nav: vo.navAsync, href: '/page/async.html'},
                    {nav: vo.navBridge, href:'/page/bridge.html'},
                ].forEach(({nav, href})=> {
                    if(location.pathname == href) nav.clss.remove('text-secondary').add('text-white');
                    else {
                        nav.clss.add('text-secondary');
                    }
                    // nav.attr({href});
                });
            }
        }, {class: 'p-3 text-bg-dark'}, [
            el.div({class: 'container'}, [
                el.div({class: 'd-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'}, [
                    el.a({href:'/', class:'d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'}, [
                        el.img({src: '/favicons/brom.png', style:'width:30px;'})
                    ]),
                    el.ul({class:'nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'}, [
                        el.li([
                            el.a('Home', {dataVo:'navHome', href:'/', class:'nav-link px-2 text-secondary'})
                        ]),
                        el.li([
                            el.a('입력폼', {dataVo:'navForm', href:'/page/form.html', class:'nav-link px-2 text-secondary'})
                        ]),
                        el.li([
                            el.a('비동기&코루틴', {dataVo:'navAsync', href:'/page/async.html', class:'nav-link px-2 text-secondary'})
                        ]),
                        el.li([
                            el.a('브릿지', {dataVo:'navBridge', href:'/page/bridge.html', class:'nav-link px-2 text-secondary'})
                        ]),
                    ]),
                    el.form({class:'col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3', role:'search'}, [
                        el.input({dataVo:'keyword', type:'search', placeholder:'Search...', 'aria-label':'Search', class:'form-control form-control-dark text-bg-dark'})
                    ]),
                    el.div({class:'text-end'}, [
                        el.button('Search', {dataVo:'search', type:'button', class:'btn btn-outline-light me-2'}),
                        el.button('Login', {dataVo:'login', type:'button', class:'btn btn-warning'})
                    ]),
                ])
            ])
        ]);
    });
});

app(_=> {
    // 로그인 팝업
    app.html.set('LoginModal', app.el.div(loginModal=> {
        // 비동기 함수 등록
        app.async.suspend(loginModal, _=> {
            const vo= app.html.dataVo(loginModal);
            vo.close.event('click', _=> app.async.resolve(loginModal));
            vo.submit.event('click', _=> alert(1));
            // 팝업 UI 처리
            app.uiModal(loginModal);
        });
    }, {class:'fade modal'}, [
        app.el.div({class:'modal-dialog', tabindex:0}, [
            app.el.div({class:'modal-content'}, [
                app.el.div({class:'modal-header'}, [
                    app.el.h5('로그인', {class:'modal-title'}),
                    app.el.button({dataVo:'close', type:'button', class:'btn-close', ariaLabel:'Close'})
                ]),
                app.el.div({class:'modal-body'}, [
                    app.el.div({class:'row'}, [
                        app.el.div({class:'col-12 mb-3'}, [
                            app.el.label('Email address', {for:'loginEmail', class:'form-label'}),
                            app.el.input({type:'email', id:'loginEmail', class:'form-control', placeholder:'name@example.com'})
                        ]),
                        app.el.div({class:'col-12 mb-3'}, [
                            app.el.label('Password', {for:'loginPassword', class:'form-label'}),
                            app.el.input({type:'password', id:'loginPassword', class:'form-control', ariaLabelledby:'loginPasswordHelp'}),
                            app.el.div('Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.', {
                                id:'loginPasswordHelp', class:'form-text'
                            })
                        ])
                    ])
                ]),
                app.el.div({class:'modal-footer'}, [
                    app.el.button('로그인', {dataVo:'submit', type:'button', class:'btn btn-primary'})
                ])
            ])
        ])
    ]));
});