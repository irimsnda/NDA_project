Ext.define('Admin.view.premiseregistration.views.panels.PremisePersonnelDetailsComparePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisepersonneldetailscomparepnl',
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
            xtype: 'initialpremisepersonneldetailsgrid',
            flex: 0.5,
            title: 'Initial Details',
            region: 'center'
        },
        {
            xtype: 'amendedpremisepersonneldetailsgrid',
            flex: 0.5,
            title: 'Amended Details',
            region: 'east'
        }
    ]
});