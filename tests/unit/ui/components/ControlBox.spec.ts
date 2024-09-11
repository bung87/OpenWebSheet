import { shallowMount } from '@vue/test-utils';
import ControlBox from '@/components/ControlBox.vue';

describe('ControlBox', () => {
  it('is a vue instance', () => {
    const wrapper = shallowMount(ControlBox);
  });

  describe('header', () => {
    it('should not exists when there is no label', () => {
      const wrapper = shallowMount(ControlBox);
      expect(wrapper.find('[data-qa=header]').exists()).toBe(false);
    });

    it('should be rendered when there the label has set', () => {
      const wrapper = shallowMount(ControlBox, {
        propsData: {
          label: 'LABEL',
        },
      });

      expect(wrapper.find('[data-qa=header]').exists()).toBe(true);
      expect(wrapper.find('[data-qa=header]').text()).toBe('LABEL');
    });
  });

  describe('content', () => {
    it('should has grid layout by default ', () => {
      const wrapper = shallowMount(ControlBox);
      const ele = wrapper
      .find('[data-qa=control-box]')
      .find('[data-qa=content]').element as HTMLElement
      expect(
        ele.style.display,
      ).toBe('grid');
    });

    it('should use grid layout when grid=true', () => {
      const wrapper = shallowMount(ControlBox, {
        propsData: {
          grid: true,
        },
      });
      const ele = wrapper
      .find('[data-qa=control-box]')
      .find('[data-qa=content]').element as HTMLElement
      expect(
         ele.style.display,
      ).toBe('grid');
    });

    it('should use flex layout when grid=false', () => {
      const wrapper = shallowMount(ControlBox, {
        propsData: {
          grid: false,
        },
      });
      const ele = wrapper
      .find('[data-qa=control-box]')
      .find('[data-qa=content]').element as HTMLElement
      expect(
        ele.style.display,
      ).toBe('flex');
    });
  });

});
