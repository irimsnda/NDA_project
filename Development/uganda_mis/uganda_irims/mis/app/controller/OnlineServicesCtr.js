/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.controller.OnlineServicesCtr', {
    extend: 'Ext.app.Controller',
    stores: ['Admin.store.online_services.OnlineMenusStr'],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'contentPanel',
            selector: '#contentPanel'
        }],

        control: {
            'dashboardguidelinesgrid #newGuideline': {
                click: 'showAddGuidelineWin'
            },
            'systemguidelinesfrm button[action=save_guideline]': {
                click: 'doCreateDashboardGuideline'
            }
        }
    },
    init: function () {

    },
	showAddGuidelineWin:function(){
		
		
	},
	doCreateDashboardGuideline:function(){
		
		
	}

});