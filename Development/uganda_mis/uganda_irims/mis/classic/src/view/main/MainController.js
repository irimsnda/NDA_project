Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },
    lastView: null,
    
    setCurrentView: function (hashTag) {
        var hashTag = (hashTag || '').toLowerCase();
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            store = navigationList.getStore();

        node = store.findNode('routeId', hashTag) ||
            store.findNode('viewType', hashTag);

        if (node == null) {
            store.on('load',function (th, records, success, eOpts) {
                    //callback : function() {}
                    var store = navigationList.getStore();
                    node = store.findNode('routeId', hashTag) || store.findNode('viewType', hashTag);
                    me.setCurrentPage(store, me, hashTag, navigationList, mainCard, mainLayout);
                }
            );
        }
        else {
            //function call
            me.setCurrentPage(store, me, hashTag, navigationList, mainCard, mainLayout);
        }
    },

    setCurrentPage: function (store, me, hashTag, navigationList, mainCard, mainLayout) {
        var view = (node && node.get('viewType')) || 'page404',
            title = node.get('tab_title'),
            module_name=node.get('module_name'),
            menu_id = node.get('menu_id'),
            access_level = node.get('access_level'),
            viewType = node.get('viewType'),
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId='+ hashTag + ']'),
            newView;
        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }
        lastView = mainLayout.getActiveItem();
        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                title: title,
                menu_id: menu_id,
                access_level: access_level,
                closable: true,
                routeId: hashTag,  // for existingItem search later
                viewType: viewType,
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            } else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }
        me.lastView = newView;
        me.lookupReference('active_tab_display_ref').setValue(module_name);
    },

    
    onNavigationTreeSelectionChange: function (tree, node) {
        if(node.get('parameter_id')){
             this.fireEvent('renderParameterMenu', node.get('parameter_id'));
             return false;  
        }
        var to = node && (node.get('routeId') || node.get('viewType')),
            routeId = node.get('routeId'),
            viewType = node.get('viewType');
        //add model for control access 

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            treeContainer = refs.treelistContainer,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();
            refs.senchaLogo.setWidth(new_width);
            //navigationList.setWidth(new_width);
            //navigationList.setMicro(collapsing);

            treeContainer.setWidth(new_width);
            treeContainer.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        } else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                // navigationList.setMicro(false);
                navigationList.setMicro(false);
                refs.senchaLogo.update('<div class="main-logo"><img src="resources/images/org-logo.jpg" style="width: 90px; height: 50px; margin-left:0;">iRIMS MIS</div>');
            }
            navigationList.canMeasure = false;
            //treeContainer.canMeasure = false;

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its children). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            //navigationList.width = new_width;
            treeContainer.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            treeContainer.el.addCls('nav-tree-animating');
            // navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                refs.senchaLogo.update('<div class="main-logo"><img src="resources/images/org-logo.jpg" style="width: 45px; height: 45px; margin-left:0;"></div>');
                treeContainer.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                        navigationList.canMeasure = true;
                    },
                    single: true
                });
            }
        }
    },

    onMainViewRender: function () {
        if (!window.location.hash) {
            this.redirectTo("admindashboard");
        }
    },

    onRouteChange: function (id) {
        this.setCurrentView(id);
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
            this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = window.location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            window.location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },
    onChangePasswordClick: function () {
        var me = this,
            win = Ext.widget('passwordchangewin');
        win.show();
    },

    updatePassword: function (btn) {
        var me = this,
            form = btn.up('form'),
            win = form.up('window'),
            confirm_new_password = form.down('textfield[name=confirm_new_password]').getValue(),
            new_password = form.down('textfield[name=new_password]').getValue(),
            frm = form.getForm(),
            pass_response = pass_complexcheck(new_password),
            error_message = pass_response.error_message
            response = pass_response.response;

            if(response){
                    if (frm.isValid()) {
                        frm.submit({
                            url: 'updatePassword',
                            waitMsg: 'Updating password...',
                            success: function (form, action) {
                                var response = Ext.decode(action.response.responseText),
                                    message = response.message;
                                toastr.success(message, "Success Response");
                                win.close();
                            },
                            failure: function (form, action) {
                                var response = Ext.decode(action.response.responseText),
                                    message = response.message;
                                toastr.error(message, 'Failure Response');
                            }
                        });
                    }
               

            }
            else{
                var message = "Password doesn't comform to the complexity policy, it must have "+error_message;
                toastr.error(message, 'Failure Response');
            }     
       
    },

    onLogoutClick: function (btn) {
        //logout user from MIS
        var form = Ext.create('Ext.form.Panel', {}),
            frm = form.getForm();
        this.redirectTo('dashboard', true);
        frm.submit({
            url: 'logout',
            headers: {
                'X-CSRF-Token': token
            },
            waitMsg: 'Logging out, Please wait...',
            success: function (fm, action) {
                setTimeout(function () {
                    location.reload();
                }, 100);
            },
            failure: function (fm, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
            }
        });
    },

    showResumableUpload: function(btn){
        print_report('upload');
    },

    afterMainPageRenders: function () {
        var mask = Ext.get('loading-mask');
        mask.fadeOut({
            callback: function () {
                mask.destroy();
            }
        });
    },

    beforeTabChange: function (tabPnl, newTab, oldTab) {
        var me = this,
            menuId = newTab.menu_id,
            routeId = newTab.routeId,
            viewType = newTab.viewType;
        if (viewType) {
            this.redirectTo(viewType);
        }
    },

    searchModules: function (textfield) {
        var search = textfield.getValue(),
            pnl = this.lookupReference('treelistContainer'),
            tree = pnl.down('treelist'),
            regex = new RegExp(search),
            store = tree.getStore();
        //newSelection = tree.getStore().filter('name', search);
        store.each(function (record, id) {
            var name = record.data.name;
            if (regex.test(name) === true) {
                // alert('true');
                tree.setSelection(record, true);
            }
        });
    },
    funcViewScheduledTcMeetingDetails:function(btn){
            //meeting details 
            var viewscheduledtcmeetings = "viewscheduledtcmeetings";

            this.redirectTo(viewscheduledtcmeetings);

    },funcShowServiceDeliveryTimesDuesDetails:function(btn){
            //meeting details 
            var viewscheduledtcmeetings = "servicedeliverytimelineoverdue";

            this.redirectTo(viewscheduledtcmeetings);

    },funcShowMyCurrentAssignment:function(btn){
            //meeting details 
            var viewscheduledtcmeetings = "usertrayassignments";

            this.redirectTo(viewscheduledtcmeetings);

    } 
});
