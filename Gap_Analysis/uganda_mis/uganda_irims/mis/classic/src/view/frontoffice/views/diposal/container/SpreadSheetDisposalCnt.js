Ext.define('Admin.view.frontoffice.disposal.container.SpreadSheetDisposalCnt', {
    extend: 'Ext.panel.Panel',
    xtype: 'spreadsheetdisposalcnt',
    layout:'border',
    controller: 'spreadsheetdisposalctr',
    tbar: [{
          xtype: 'combobox',
          forceSelection: true,
          queryMode: 'local',
          displayField: 'name',
          valueField: 'id',
          name: 'sub_module',
          widht: 200,
          fieldLabel: 'Application Type',
          labelStyle: 'margin-left:20px',
          value: 'New',
          listeners:
           {
               beforerender: {//getConfigParamFromTable
                  fn: 'setConfigCombosStore',
                  config: {
                      pageSize: 10000,
                      proxy: {
                          url: 'configurations/getConfigParamFromTable',
                          extraParams: {
                              table_name: 'sub_modules',
                              filters: '{"module_id":15}'
                          }
                          
                      }
                  },
                  isLoad: true
              },
              beforequery: function() {
                var store=this.getStore();
                
                  var all={name: 'All',id:0};
                    store.insert(0, all);
                  },
              select: 'loadApplicationColumns'
            
             }
       },'->',
           { 
             xtype: 'button', 
             text: 'Export Summary',
             name: 'summary',
             ui: 'soft-purple',
             iconCls: 'x-fa fa-cloud-upload', 
             handler: 'func_exportdisposalspreadsheet'
          },{
             xtype: 'button', 
             text: 'Export Detailed Report(All)',
             name: 'detailed',
             ui: 'soft-purple',
             iconCls: 'x-fa fa-refresh', 
             handler: 'func_exportdisposalspreadsheet'
          },{
             xtype: 'button', 
             text: 'clear Filter',
             ui: 'soft-purple',
             iconCls: 'x-fa fa-print', 
             handler: 'func_clearfilters'
          }
        ],
     items: [{
        xtype: 'panel',
        titleCollapse: true,
        title: 'View Options',
        region:'west',
        collapsible: true, 
        preventHeader: true, 
        width: 200,
        border: true,
        split: true,
        layout: 'border',
        items: [
         {
          	xtype: 'spreadsheetdisposalvisiblecolumns',
              height: 250,
              region: 'north'
         },{
            xtype: 'disposaladditionalfiltersview',
              height: 200,
              region: 'center'
         },
         ]
     },{
        xtype: 'spreadsheetdisposalview',
        region:'center',
     },
     {
        title: 'Disposal Product Details',
        xtype: 'panel',
        collapsible: true, 
        collapsed: true,
        titleCollapse: true,
        width:250,
        split: true,
        autoScroll : true,
        border: true,
        region: 'east',
        layout: 'accordion',
        items:[
        {
        	xtype: 'disposalproductview',
          height: 150
        } ]
       
     }]
});