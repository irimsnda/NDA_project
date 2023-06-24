/**
 * Created by Softclans on 5/23/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.AppDataAmmendmentRequestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'appdataammendmentrequestfrm',
    controller: 'commoninterfacesVctr',
    layout: 'column',
    bodyPadding: 5,
    frame: true,
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        margin: 3
    },
    items: [
        {
            xtype: 'hidden',
            name: 'id'
        },
        {
            xtype: 'hidden',
            name: 'application_code'
        },
        {
            xtype: 'hidden',
            name: 'module_id'
        },
        {
            xtype: 'hidden',
            name: 'section_id'
        }, {
            xtype: 'hidden',
            name: 'appdata_ammendementrequest_id'
        },
        {
            xtype: 'hidden',
            name: 'table_name',
            value: 'tra_appsections_ammendments'
        },
        {
            xtype: 'hidden',
            name: '_token',
            value: token
        },
        {
            xtype: 'hidden',
            name: 'unset_data',
            value: 'module_id,section_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Requested Section',
            name: 'part_id',
            allowBlank: false,
            queryMode: 'local',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_alteration_setup'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var store = this.getStore(),
                        form = this.up('form'),
                        module_id = form.down('hiddenfield[name=module_id]').getValue(),
                       
                        filterObj = {module_id: module_id},
                        filterStr = JSON.stringify(filterObj);
                    store.removeAll();
                    store.load({params: {filters: filterStr}});
                }
            }
        },
         {
            xtype: 'textarea',
            name: 'remarks',
            fieldLabel: 'Remarks',
            allowBlank: false
        }
    ],
    buttons: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            handler: 'doCreateCommonParamWin',
            action_url: 'api/saveCommonData',
            table_name: 'tra_appsections_ammendments',
            storeID: 'appdataammendmentrequeststr',
        }
    ]
});