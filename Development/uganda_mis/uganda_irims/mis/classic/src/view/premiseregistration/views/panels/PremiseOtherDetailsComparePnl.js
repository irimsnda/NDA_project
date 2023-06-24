Ext.define('Admin.view.premiseregistration.views.panels.PremiseOtherDetailsComparePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premiseotherdetailscomparepnl',
    height: 450,
    layout: {
        type: 'border'
        //align: 'stretch'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    items:[
        {
            xtype: 'initialpremiseotherdetailsgrid',
            flex: 0.5,
            title: 'Initial Details',
            region: 'center'
        },
        {
            xtype: 'amendedpremiseotherdetailsgrid',
            flex: 0.5,
            title: 'Amended Details',
            region: 'east'
        }
    ]
});