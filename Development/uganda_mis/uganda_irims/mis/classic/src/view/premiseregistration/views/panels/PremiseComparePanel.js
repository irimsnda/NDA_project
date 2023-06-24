/**
 * Created by Kip on 6/4/2019.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseComparePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisecomparepanel',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    height: 600,
    layout: {
        type: 'border'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    dockedItems:{
      xtype: 'toolbar',
      dock: 'bottom',
      ui: 'footer',
      items:[
          '->',
          {
              text: 'Accept Changes Made(If Any)',
              iconCls: 'x-fa fa-check-square-o',
              ui: 'soft-purple',
              handler: 'acceptPortalAmendedDetails'
          }
      ]
    },
    items:[
        {
            xtype: 'premisemiscomparepreviewpnl',
            flex: 0.5,
            title: 'Initial/MIS Details',
            region: 'center'
        },
        {
            xtype: 'premiseportalcomparepreviewpnl',
            flex: 0.5,
            title: 'Amended/PORTAL Details',
            region: 'east'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        }
    ]
});