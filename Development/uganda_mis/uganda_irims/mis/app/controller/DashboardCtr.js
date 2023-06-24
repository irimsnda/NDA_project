/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.controller.DashboardCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.dashboard.DashboardGridAbstractStore',
        'Admin.store.dashboard.InTrayStr',
        'Admin.store.dashboard.OnlineApplicationDashBoardGridStr',
        'Admin.store.dashboard.OnlineEvalQueryResponseAppDashboardGridStr',
        'Admin.store.dashboard.OnlineAppsSubmissionCounterStr',
        'Admin.store.dashboard.ExternalUserIntrayStr',
        'Admin.store.dashboard.ExternalUserOutTrayStr',
        'Admin.store.dashboard.OutTrayStr',
        'Admin.store.dashboard.OverDueTrayStr',
        'Admin.store.dashboard.OverDueSummaryTrayStr',
        'Admin.store.dashboard.UserTrayAssignmentsStr',

        'Admin.store.dashboard.SummaryIntrayGridStr',

		'Admin.store.Month_store',
        'Admin.store.Year_store'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
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

    /**
     * Called when the view is created
     */
    init: function () {

    },

    showAddGuidelineWin: function () {
        var me = this,
            form = Ext.widget('systemguidelinesfrm'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            menu_id = activeTab.menu_id,
            menu_name = activeTab.title;
        form.down('hiddenfield[name=menu_id]').setValue(menu_id);
        funcShowCustomizableWindow('System Guidelines for: ' + menu_name, '40%', form, 'customizablewindow');
    },

    doCreateDashboardGuideline: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            guidelineGrid=activeTab.down('dashboardguidelinesgrid'),
            store=guidelineGrid.getStore();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    }

});