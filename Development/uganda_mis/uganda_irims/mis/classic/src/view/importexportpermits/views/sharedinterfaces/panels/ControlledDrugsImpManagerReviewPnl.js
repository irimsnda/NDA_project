/**
 * Created by Softclans on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ControlledDrugsImpManagerReviewPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Controlled Drugs Permit Permit Review',
    xtype: 'controlleddrugsimpmanagerreviewpnl',
    layout: 'fit',
    permitsdetails_panel: 'previewcontroldrugsimppermitdetails',
    itemId: 'main_processpanel',
    layout: 'fit',
    defaults: {
        split: true,
    }, viewModel: {
        type: 'importexportpermitsvm'
    },
    
    items:[{
        xtype:'controlleddrugsimpmanagerreviewwizrd'
    }]
});