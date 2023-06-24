/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.panels.WorkflowStagesTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'workflowstagestabpnl',
    ui: 'navigation',
    tabBar: {
        layout: {
            pack: 'center'
        },
        border: false
    },

    defaults: {
        iconAlign: 'top'
    },
    items: [
        {
            xtype: 'workflowstagesfrm',
            title: 'Workflow Stage Info'
        }, {
            title: 'Responsible Groups',
            items: [
                {
                    xtype: 'workflowstageresponsiblegroupsgrid'
                }
            ],
            listeners: {
                beforeactivate: function () {
                    var tabPnl = this.up('tabpanel'),
                        form = tabPnl.down('workflowstagesfrm'),
                        stage_id = form.down('hiddenfield[name=id]').getValue();
                    if (!stage_id) {
                        toastr.warning('Please save workflow stage details first!!', 'Warning Response');
                        return false;
                    }
                }
            }
        }, {
            title: 'Workflow Stage Actions',
            items: [
                {
                    xtype: 'workflowactionsgrid'
                }
            ],
            listeners: {
                beforeactivate: function () {
                    var tabPnl = this.up('tabpanel'),
                        form = tabPnl.down('workflowstagesfrm'),
                        stage_id = form.down('hiddenfield[name=id]').getValue();
                    if (!stage_id) {
                        toastr.warning('Please save workflow stage details first!!', 'Warning Response');
                        return false;
                    }
                }
            }
        }
    ]
});