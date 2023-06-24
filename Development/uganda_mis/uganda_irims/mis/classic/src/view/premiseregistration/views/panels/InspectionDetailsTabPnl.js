/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.InspectionDetailsTabPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inspectiondetailstabpnl',
    /*ui: 'navigation',
    tabBar: {
        layout: {
            pack: 'center'
        },
        border: false
    },

    defaults: {
        iconAlign: 'top'
    },*/

    items: [
        {
            xtype: 'premiseinspectionrecommfrm',
            title: 'Basic Details',
            
            defaults: {
                columnWidth: 0.3,
                labelAlign: 'top',
                margin: 4,
                allowBlank: false
            },
        }, {
            title: 'Inspectors',
            items: [
                {
                    xtype: 'inspectioninspectorsgrid'
                }
            ],
            listeners: {
                beforeactivate: function () {
                    var tabPnl = this.up('tabpanel'),
                        form = tabPnl.down('premiseinspectionrecommfrm'),
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