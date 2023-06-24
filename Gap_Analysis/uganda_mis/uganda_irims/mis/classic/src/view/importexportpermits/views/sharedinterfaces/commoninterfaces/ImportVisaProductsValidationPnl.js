
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.ImportVisaProductsValidationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'importvisaproductsvalidationpnl',
    layout: {//
        type: 'border'
    },
    height: 600,
    autoScroll: true,
    items:[{
        xtype: 'importvisaproductsvalidationgrid',//
        tbar:['->',{
            text:'Update Permits Products Recommendation',
            name:'btn_updatesprodrecommendtion',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-red',
        }],
        bbar:[{
            xtype: 'pagingtoolbar',
            width: '80%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                this.up('importvisaproductsvalidationgrid').fireEvent('refresh', this);//
            }
        },'->',{
            text:'Update Permits Products Recommendation',
            name:'btn_updatesprodrecommendtion',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-red',
        }],
        title: 'Recommendation on Import/Export Permit Products Details',
        region: 'center',
        collapsible: true
    },{
        xtype: 'importexportproductsvalidationfrm',
        region: 'east',
        width: '300',
        collapsible: true
    },{
        xtype:'hiddenfield',
        name: 'application_code'
    },{
        xtype:'hiddenfield',
        name: 'active_application_code'
    }]

    
});