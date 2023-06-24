Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],

    onRefreshToggle: function(tool, e, owner) {
        var store, runner;

        if (tool.toggleValue){
            this.clearChartUpdates();
        } else {
            store = this.getStore('networkData');
            if (store.getCount()) {
                runner = this.chartTaskRunner;
                if (!runner) {
                    this.chartTaskRunner = runner = new Ext.util.TaskRunner();
                }
                runner.start({
                    run : function () {
                        // Move the first record to the end
                        var rec = store.first();
                        store.remove(rec);
                        store.add(rec);
                    },
                    interval : 200
                });
            }
        }

        // change the toggle value
        tool.toggleValue = !tool.toggleValue;
    },

    clearChartUpdates : function() {
        this.chartTaskRunner = Ext.destroy(this.chartTaskRunner);
    },
    
    destroy: function () {
        this.clearChartUpdates();
        this.callParent();
    },
    
    onHideView: function () {
        this.clearChartUpdates();
    },
    // loadApplicationAssaignmentTab: function(me) {
    //     //check right
    //     Ext.Ajax.request({
    //         url: 'dashboard/checkAssignmentDefination',
    //         params: {
    //             _token: token
    //         },
    //         success: function (response) {
    //             var resp = Ext.JSON.decode(response.responseText);
    //             if(resp.has_defination){
    //                 var tab = Ext.widget('applicationassignmenttab');
    //                     //panel = me.up('panel');
    //                 tab.down('hiddenfield[name=group_id]').setValue(resp.group_id);
    //                 me.add(tab);
    //             }
               
    //         },
    //         failure: function (response) {
    //              toastr.error('Failed to check assaignment', 'Error Response');
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             toastr.error('Error checking assaingment: ' + errorThrown, 'Error Response');
    //         }
    //     });
    
        
    // },
});
