/**
 * Created by Softclans.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationAnnualReturnsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationAnnualreturnsFrm',
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
        },
        {
            xtype: 'hidden',
            name: 'table_name',
            value: 'tra_application_annualreturns'
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
            fieldLabel: 'Returns Category',
            name: 'returns_category_id',
            allowBlank: true,
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
                                table_name: 'par_returns_categories'
                            }
                        }
                    },
                    isLoad: false
                },
                // afterrender: function () {
                //     var store = this.getStore(),
                //         form = this.up('form'),
                //         module_id = form.down('hiddenfield[name=module_id]').getValue(),
                //         section_id = form.down('hiddenfield[name=section_id]').getValue(),
                //         filterObj = {module_id: module_id, section_id: section_id},
                //         filterStr = JSON.stringify(filterObj);
                //     store.removeAll();
                //     store.load({params: {filters: filterStr}});
                // }
            }
        }, {
            xtype: 'textarea',
            name: 'declared_return',
            fieldLabel: 'Declare Return',
            allowBlank: false
        }, {
            xtype: 'textarea',
            name: 'return_background_information',
            fieldLabel: 'Background Information/Description'
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
            table_name: 'tra_application_annualreturns',
            storeID: 'annualreturnsGridStr',
        }
    ]
});