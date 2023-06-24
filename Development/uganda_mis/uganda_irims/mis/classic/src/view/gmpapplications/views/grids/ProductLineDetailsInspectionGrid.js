/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineDetailsInspectionGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    xtype: 'productlinedetailsinspectiongrid',

    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Update Product Line Details',
        iconCls: 'x-fa fa-plus',
        name:'update_line',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    },'->',{
        xtype: 'button',
        text: 'Previous Recommendation',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'prev_productline_details',
        winTitle: 'Previous GMP Product Line Details',
        childXtype: 'prevproductlinedetailsgrid',
        winWidth: '80%',
        stores: '[]'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid')
                if(grid.up('window')){
                    var win = grid.up('window');
                    site_id = win.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue(),
                    section_id = win.down('hiddenfield[name=section_id]').getValue();

                }
                else{

                    mainTabPanel = grid.up('#contentPanel'),
                    activeTab = mainTabPanel.getActiveTab(),
                    site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
                    section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

                }
               
            store.getProxy().extraParams = {
                site_id: site_id,
                section_id:section_id
            };
        }
    }],
    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    },{
        ptype: 'filterfield'
    }],
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        hideGroupedHeader: true,
        enableGroupingMenu: false
    },{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                groupField:'product_line_category',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionLineDetails'
                }
            },
            isLoad: true
        }
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'prodline_inspectionstatus_id',
        text: 'Inspection Recommendation',
        flex: 1,
        tdCls: 'wrap-text',   
        tdcls: 'editor-text',
        width: 120,
        editor: {
            xtype: 'combo',
            store: 'gmpproductlinestatusstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
               
            }
        },
        
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = 'Select Inspection Recommendation';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_line_status',
        text: 'Status',
        hidden: true,
        flex: 1
    }]
});