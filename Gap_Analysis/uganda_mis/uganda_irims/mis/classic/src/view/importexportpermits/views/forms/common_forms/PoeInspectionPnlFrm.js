

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PoeInspectionPnlFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'poeinspectionpnlfrm',
    itemId: 'poeinspectionpnlfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: false,
       
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_poe_applications'
    },{
        xtype:'datefield',
        fieldLabel:'Date of Inspection',
        format: 'Y-m-d',
        maxValue: new Date(), altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
   
        name: 'inspected_on'
    } ,{
        xtype:'textfield',
        fieldLabel: 'Custom Clearance/Declaration Number',
        name:'custom_declaration_no'
    } , {
        xtype: 'fieldcontainer',
        layout: 'column',
        width: 320,
        items:[{
            xtype: 'combo',
            fieldLabel: 'Clearing Agent',
            labelWidth: 80,
            columnWidth: 0.9,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            labelAlign:'top',
            name: 'clearing_agent_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 1000,
                        storeId:'clearingagentsStr',
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                           
                            extraParams: {
                                table_name: 'par_clearing_agents',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'button',
            text: 'add',
            width: '50px',
            iconCls: 'x-fa fa-plus',
            columnWidth: 0.082,
            form: 'clearingAgentfrm',
            title: 'Add Agent',
            handler: 'showAddFormWin'
        }
        ]
    },{
        xtype:'datefield',
        maxValue: new Date(),
        fieldLabel:'RRA Registration Date',format: 'Y-m-d', altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
   
        name: 'tra_reg_date'
    }, {
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'poeport_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_ports_information',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    } ]
   
   
});