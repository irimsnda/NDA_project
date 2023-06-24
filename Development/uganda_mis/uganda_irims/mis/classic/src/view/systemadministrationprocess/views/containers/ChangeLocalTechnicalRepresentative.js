
Ext.define('Admin.view.systemadministrationprocess.views.containers.ChangeLocalTechnicalRepresentative', {
  extend: 'Ext.Container',
  xtype: 'changelocaltechnicalrepresentative',
  controller: 'systemadministrationprocessvctr',
  layout: 'border',
  items: [{
          xtype: 'changelocaltechnicalrepresentativedashwrapper',//drugsproductRegDashWrapper
          region: 'center'
      },
      {
          xtype: 'changelocaltechnicalrepresentativetb',
          region: 'south'
      }
  ]
});