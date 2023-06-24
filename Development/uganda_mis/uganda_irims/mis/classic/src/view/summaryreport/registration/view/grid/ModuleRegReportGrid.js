Ext.define('Admin.view.summaryreport.registration.view.grid.ModuleRegReportGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registrationreportviewctr',
    xtype: 'moduleregreportgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
                    tab = grid.up('tabpanel'),
        			panel = tab.up('panel'),
                       sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                       module_id = panel.down('combo[name=module_id]').getValue(),
                       zone_id = panel.down('combo[name=zone_id]').getValue(),
			           section_id = panel.down('combo[name=section_id]').getValue(),
			           to_date = panel.down('datefield[name=to_date]').getValue(),
			           from_date=panel.down('datefield[name=from_date]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        sub_module_id: sub_module_id,
                        zone_id: zone_id,
                        section_id:section_id,
                        to_date: to_date,
                        module_id: module_id,
                        from_date: from_date
                }
                
        	},
    }],
    features: [{
        ftype: 'groupingsummary',
        startCollapsed: true,
        groupHeaderTpl: 'Module: {[values.rows[0].data.module_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        //hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'module_name',
                storeId: 'moduleregreportStr',
                proxy: {
                    url: 'summaryreport/getModuleRegReport'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'ID',
        hidden: true,
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module',
        flex: 1,
        summaryRenderer: function(value){
             return "<b>Grand Total:</b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'received_applications',
        text: 'Received Applications',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'approved_applications',
        text: 'Approved Applications',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'rejected_applications',
        text: 'Rejected Applications',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'Queried',
        text: 'Queried',
        flex: 1,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return "<b>"+value+"<b>"
          },
    }]
    
});
