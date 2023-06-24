/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseMainDetailsComparePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisemaindetailscomparepnl',
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
            xtype: 'initialpremisedetailsfrm',
            flex: 0.5,
            title: 'Initial Details',
            region: 'center'
        },
        {
            xtype: 'amendedpremisedetailsfrm',
            flex: 0.5,
            title: 'Amended Details',
            region: 'east'
        }
    ]
});