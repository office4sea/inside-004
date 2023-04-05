app(_=> {
    app.html.insert(app.el.get('header'));
    app.html.insert(_createFormMain());

    function _createFormMain() {
        _setEnablePopup();

        return app.el.div(main=> {
            const vo= app.html.dataVo(main);
            // What's new
            // app.modal을 통한 비동기 처리
            vo.btnWhat.event('click', e=> _modalWhat(e));
            // Enable this setting?
            // 비동기 직접 구현
            vo.btnEnable.event('click', e=> {
                const popup= app.html.get('popupEnable');

                // [popup] 비동기 대기 함수 호출
                app.debug.info('popup 비동기 처리', '비동기 대기 함수 호출');
                app.async.await(popup, 'Enable this setting?')
                    .then(result=> {
                        app.debug.success('popup 비동기 처리', '정상 반환값', result);
                    })
                    .catch(reason=> {
                        app.debug.danger('popup 비동기 처리', '거부 반환값', reason);
                    })
                    .finally(_=> {
                        app.debug.info('popup 비동기 처리', '비동기 완료(귀결/거부)');
                        // 팝업 UI 처리
                        app.uiModal(popup, e);
                    })
            });
            // 비동기 직접 구현
            // async/await 문법의 사용
            vo.btnAsync.event('click', async e=> {
                const popup= app.html.get('popupEnable');

                // [popup] 비동기 대기 함수 호출
                app.debug.info('popup 비동기 처리', '비동기 대기 함수 호출');
                try {
                    const result= await app.async.await(popup, 'Enable this setting?');
                    app.debug.success('popup 비동기 처리', '정상 반환값', result);
                } catch(e) {
                    app.debug.danger('popup 비동기 처리', '거부 반환값', e);
                }

                app.debug.info('popup 비동기 처리', '비동기 완료(귀결/거부)');
                // 팝업 UI 처리
                app.uiModal(popup, e);
            });

        }, {class: 'container mt-4'}, [
            app.el.div('A simple primary alert—check it out!', {class:'alert alert-primary', role:'alert'}, [
                app.el.p('코루틴이 래핑된 modal 함수의 사용'),
                app.el.div({class:'row mt-2'}, [
                    app.el.div({class: 'col'}, [
                        app.el.button(`What's new`, {dataVo:'btnWhat', class:'btn btn-primary'})
                    ])
                ])
            ]),
            app.el.div('A simple secondary alert—check it out!', {class:'alert alert-secondary', role:'alert'}, [
                app.el.p('코루틴을 이용한 서로 다른 프로세스간 메시지 전달을 구현 합니다.'),
                app.el.div({class:'row mt-2'}, [
                    app.el.div({class: 'col'}, [
                        app.el.button('Enable this setting?', {dataVo:'btnEnable',class:'btn btn-secondary'})
                    ])
                ])
            ]),
            app.el.div('A simple success alert—check it out!', {class:'alert alert-success', role:'alert'}, [
                app.el.p('async/await 키워드를 사용한 구현 방법 입니다.'),
                app.el.div({class:'row mt-2'}, [
                    app.el.div({class: 'col'}, [
                        app.el.button('Enable this setting?', {dataVo:'btnAsync',class:'btn btn-success'})
                    ])
                ])
            ]),
        ])
    }
    function _setEnablePopup() {
        app.html.set('popupEnable', app.el.div(view=> {
            const vo= app.html.dataVo(view);
            vo.yes.event('click', e=> {
                // [popup] 비동기 귀결처리
                // {a:1}값을 반환
                app.debug.info('popup 비동기 처리', '비동기 귀결 확정');
                app.async.resolve(view, {a:1});
            });
            vo.no.event('click', e=> {
                // [popup] 비동기 거부처리
                // {b:1}값을 반환
                app.debug.info('popup 비동기 처리', '비동기 거부 처리');
                app.async.reject(view, {b:1});
            });

            // [popup] 비동기 대기 함수 등록
            app.async.suspend(view, payload=> {
                app.debug.info('popup 비동기 처리', '등록된 비동기 대기 함수 수행', [payload]);
                // 넘어온 파라미터값 적용
                vo.title.text= payload;
                // 팝업 UI 처리
                app.uiModal(view);
            });
        }, {class:'fade modal'}, [
            app.el.div({class:'modal-dialog'}, [
                app.el.div({class:'modal-content rounded-3 shadow'}, [
                    app.el.div({class:'modal-body p-4 text-center'}, [
                        app.el.h5('title', {dataVo:'title', class:'mb-0'}),
                        app.el.p({class:'mb-0'}, 'You can always change your mind in your account settings.')
                    ]),
                    app.el.div({class:'modal-footer flex-nowrap p-0'}, [
                        app.el.button({dataVo:'yes', type:'button', class:'btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end'}, [
                            app.el.strong('Yes, enable')
                        ]),
                        app.el.button('No thanks', {dataVo:'no', type:'button', class:'btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0'})
                    ])
                ])
            ])
        ]));
    }

    function _modalWhat(focus) {
        return app.modal({
            focus,
            onLoad({view, resolve}) {
                const vo= app.html.dataVo(view);
                vo.close.event('click', e=> resolve());
            },
            view: app.el.div({class:'fade modal'}, [
                app.el.div({class:'modal-dialog', tabindex:0}, [
                    app.el.div({class:'modal-content rounded-4 shadow'}, [
                        app.el.div({class:'modal-body p-5'}, [
                            app.el.h2(`What's new`, {class:'fw-bold mb-0'}),
                            app.el.ul({class:'d-grid gap-4 my-5 list-unstyled small'}, [
                                app.el.li({class:'d-flex gap-4'}, [
                                    app.el.div('Not into lists? Try the new grid view.', [
                                        app.el.h5('Grid view', {class:'mb-0'})
                                    ])
                                ]),
                                app.el.li({class:'d-flex gap-4'}, [
                                    app.el.div('Save items you love for easy access later.', [
                                        app.el.h5('Bookmarks', {class:'mb-0'})
                                    ])
                                ]),
                                app.el.li({class:'d-flex gap-4'}, [
                                    app.el.div('Share videos wherever you go.', [
                                        app.el.h5('Video embeds', {class:'mb-0'})
                                    ])
                                ]),
                            ]),
                            app.el.button('Great, thanks!', {dataVo:'close', type:'button', class:'btn btn-lg btn-primary mt-5 w-100'})
                        ]),
                    ])
                ])
            ])
        });
    }
    function _modalEnable() {}
});
