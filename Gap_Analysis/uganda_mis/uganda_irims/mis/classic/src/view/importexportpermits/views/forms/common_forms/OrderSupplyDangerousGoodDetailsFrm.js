

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.OrderSupplyDangerousGoodDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ordersupplydangerousgooddetailsfrm',
    itemId: 'importexportdetailsfrm',
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.49,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_importexport_applications'
    },{
        xtype: 'combo',
        fieldLabel: 'Application Type',
        labelWidth: 80,
        width: 320,
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }, 
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'sub_modules',
                            module_id:12
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype:'textfield',
        name:'ordered_by',
        fieldLabel:'Ordered By Details(Full Names)',
        allowBlank: true
    },{
        xtype:'textfield',
        name:'qualification_license_no',
        fieldLabel:'HPCZ or Vaz License No:',
        allowBlank: true
    }, {
        xtype:'textfield',
        name:'qualifications',
        fieldLabel:'Qualifications',
        allowBlank: true
    }]
   
});