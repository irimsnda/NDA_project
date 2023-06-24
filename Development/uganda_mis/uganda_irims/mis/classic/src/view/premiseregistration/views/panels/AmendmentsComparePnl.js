/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.AmendmentsComparePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'amendmentscomparepnl',
    height: 450,
    layout: {
        type: 'border'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    items:[
        {
            xtype: 'alterationcompareformfieldsgrid',
            flex: 0.5,
            title: 'Form Parts',
            region: 'center'
        },
        {
            xtype: 'alterationcompareparamsgrid',
            flex: 0.5,
            title: 'Other Parts',
            region: 'east'
        }
    ]
});