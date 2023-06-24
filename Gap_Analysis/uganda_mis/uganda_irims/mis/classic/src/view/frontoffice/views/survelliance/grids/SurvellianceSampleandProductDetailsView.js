 Ext.define('Admin.view.frontoffice.survelliance.grids.SurvellianceSampleandProductDetailsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   collapsible: true,
   titleCollapse: true,
   width: '100%',
   xtype: 'survelliancesampleandproductdetailsview',
   layout: 'fit',
   listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                storeId: 'survelliancesampleandproductdetailsviewStr',
                proxy: {
                    url: 'openoffice/getSurvellianceSampleandProductDetails'
                }
            },
            isLoad: true
        }
    },
    title: 'PMS Plan',
      viewConfig: {
            emptyText: 'No product samples'
        },
    columns: [
    {
        text: 'Action',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            ui: 'gray',
            iconCls: 'x-fa fa-th-list',
            textAlign: 'left',
            xtype: 'splitbutton',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'View Sample Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'View sample Details',
                        handler: 'func_viewSampleDetails'
                       }]
              }
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        name: 'id',
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product',
        text: 'Product',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'strength',
        text: 'Strength',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_collected',
        text: 'Brand To Be Collected',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_per_brand',
        text: 'Batch Per Brand',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_pack',
        text: 'Unit Pack',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_pack_per_batch',
        text: 'Unit Pack per Batch',
        width: 150
    }]


  });