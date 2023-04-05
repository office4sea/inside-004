/**@type {App} */
const app= br('brApp', app=> {
    app.debug(1);
    app.debug.log('app.log', app.version);
    app.debug.warn('app.warn', 1);
    app.debug.error('app.error', 1);

    const a= ['abcDef', 'abc-def', 'ABC-DEF', 'ABC_DEF', 'abc_def', '_abc_def'];
    app.debug.info('--kebabCase--', a.map(a=> app.snippet.kebabCase(a)));
    app.debug.info('--kebabCase--', a.map(a=> app.snippet.kebabCase(a, false)));
    app.debug.success('--snakeCase--', a.map(a=> app.snippet.snakeCase(a)));
    app.debug.success('--snakeCase--', a.map(a=> app.snippet.snakeCase(a, false)));
    app.debug.danger('--camelCase--', a.map(a=> app.snippet.camelCase(a)));
    app.debug.danger('--pascalCase--', a.map(a=> app.snippet.pascalCase(a)));

    /**
     * 팝업 UI 처리
     * @param {BrHtmlElementItem} target 적용할 화면 객체
     * @param {BrHtmlElementItem=} moveTarget 리턴 포커스로 종료 시 전달
     * @returns {Promise<void>}
     */
    app.uiModal= (target, moveTarget)=> {
        if(moveTarget) {
            return new Promise(resolve=> {
                target.clss.remove('show');
                target.ontransitionend= e=> {
                    if(e.propertyName != 'transform') return;
    
                    target.remove();
                    if(moveTarget instanceof HTMLElement) moveTarget.focus();
                    else {
                        try {
                            (moveTarget.currentTarget || moveTarget.target).focus();
                        } catch(e) {
                            app.debug.error('포커싱 대상 미존재', e, [target, moveTarget]);
                        }
                    }
                    resolve();
                };
            });
        } else {
            target.style.cssText= 'display:block; background:rgba(0,0,0,0.5);';
            // app.insertEl(target);
            app.html.insert(target);
            target.ontransitionend= undefined;
            requestAnimationFrame(_=>target.clss.add('show'));
            return Promise.resolve();
        }
    };
    /**
     * 모달 팝업을 호출 합니다.
     * @param {object} option
     * @param {BrHtmlElementItem} option.view 호출 할 엘리먼트 객체
     * @param {BrHtmlElementItem} option.focus 리턴 포커스
     * @param {object=} option.payload 호출 된 팝업에 전달 할 데이터 값
     * @returns {Promise<any>}
     */
    app.modal= ({view, focus, payload, onLoad}={})=> {
        // 비동기 수행 함수 등록
        app.async.suspend(view, payload=> {
            const resolve= data=> app.async.resolve(view, data);
            const reject= data=> app.async.reject(view, data);
            onLoad && onLoad({view, payload, resolve, reject});
            app.uiModal(view);
        });
        // 비동기 대기 함수 호출
        return app.async.await(view, payload).finally(_=> app.uiModal(view, focus));
    };
    /**
     * Alert 팝업을 호출합니다.
     * @param {BrHtmlElementItem} focus 리턴 포커스
     * @param {any=} payload 출력 메시지, 객체
     * @returns 
     */
    app.alert= (focus, payload)=> app.modal({
        focus, payload,
        view: app.html.get('alert'),
        onLoad({view, payload, resolve}) {
            const data= typeof payload == 'string' ? {message: payload} : payload;
            const vo= app.html.dataVo(view);
            vo.setHtmls(Object.assign({message:'', ok:'확인'}, data));
            data.title ? vo.title.clss.remove('d-none') : vo.title.clss.add('d-none');

            vo.close.event('click', e=> resolve());
            vo.ok.event('click', e=> resolve());
            app.debug.log('-alert onLoad-', [view, vo, data]);
        },
    });
    // 레이어팝업 Alert
    app.html.set('alert', app.el.div({class:'fade modal'}, [
        app.el.div({class:'modal-dialog', tabindex:0}, [
            app.el.div({class:'modal-content'}, [
                app.el.div({class:'modal-header'}, [
                    app.el.h5('알림', {dataVo:'title', class:'modal-title d-none'}),
                    app.el.button({dataVo:'close', type:'button', class:'btn-close', ariaLabel:'Close'})
                ]),
                app.el.div('메시지', {dataVo:'message', class:'modal-body'}),
                app.el.div({class:'modal-footer'}, [
                    app.el.button('확인', {dataVo:'ok', type:'button', class:'btn btn-primary'})
                ])
            ])
        ])
    ]));
});
