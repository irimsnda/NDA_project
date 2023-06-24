
Ext.define('Admin.view.systemadministrationprocess.views.containers.ChangeMarketAuthorisation', {
  extend: 'Ext.Container',
  xtype: 'changemarketauthorisation',
  controller: 'systemadministrationprocessvctr',
  layout: 'border',
  items: [{
          xtype: 'changemarketauthorisationdashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'changemarketauthorisationtb',
          region: 'south'
      }
  ]
});